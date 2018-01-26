<template>
  <div class="image-zip-upload">
    <Button
      :loading="uploading"
      :type="!!model ? 'warning' : 'info'"
      icon="ios-cloud-upload-outline"
    >
      {{btnTxt}}
    </Button>
    <input @click="btnClick" v-if="!uploading" type="file" title="请选择图片" :accept="accept.join(',')" @change="chooseChange">
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        uploading: false, // 上传状态
        quality: 1,
        uploadMaxSize: 2 * 1024 * 1024, // 上传最大2M
        zipMaxSize: 200 * 1024, // 只对200KB以上的数据执行压缩
        accept: ['image/jpeg', 'image/jpg', 'image/png'],
        acceptName: ['jpg', 'png'],
        chooseFile: '',
        chooseImg: '',
      };
    },
    props: {
      model: {
        type: String,
        default: '',
      },
      preview: { // 图片选择后预览回调
        type: Function,
        default: () => {},
      },
      action: {
        type: String,
        default: '',
      },
      data: {
        type: Object,
        default() {
          return {};
        },
      },
      size: { // 图片尺寸限制
        type: Object,
        default() {
          return {};
        },
      },
    },
    computed: {
      ...mapState([
        'uploadApi',
      ]),
      btnTxt() {
        if (this.model && !this.uploading) {
          return '重新上传';
        }

        if (this.uploading) {
          return '上传中...';
        }

        return '选择图片';
      },
    },
    methods: {
      btnClick() {
        this.$emit('click');
      },
      showError(msg) {
        this.$Notice.error({
          title: '上传失败',
          desc: msg,
        });
        this.uploading = false;
      },
      chooseChange(e) {
        const file = e.target.files[0];
        if (this.accept.indexOf(file.type) === -1) { // 判断用户选择文件类型
          this.showError(`选择文件类型不符，请选择${this.acceptName.join('或')}的图片`);
          return;
        }

        if (file.size > this.uploadMaxSize) {
          this.showError('文件大小不能超过2M');
          return;
        }
        this.chooseFile = file;
        this.readImage();
      },
      readImage() {
        if (this.chooseFile) {
          this.uploading = true;

          const reader = new FileReader();
          reader.onload = () => {
            // 修改图片压缩系数
            if (reader.result.length > this.zipMaxSize) {
              this.quality = 0.6;
            }

            const img = new Image();
            img.onload = () => {
              this.chooseImg = img;
              // 判断文件尺寸
              if (this.checkSize()) {
                this.preview(img);
                this.compressAndUploadImage();
              }
            };
            img.src = reader.result;
          };
          reader.readAsDataURL(this.chooseFile);
        }
      },
      checkSize() {
        if (this.size.width && this.size.height) { // 有宽度/高度限制
          if (
            this.chooseImg.width !== this.size.width
            ||
            this.chooseImg.height !== this.size.height
          ) {
            this.showError(`图片尺寸不满足，请选择（${this.size.width} x ${this.size.height}）的图片`);
            return false;
          }
        }
        return true;
      },
      compressAndUploadImage() {
        if (this.chooseImg) {
          const canvas = document.createElement('canvas');

          if (!this.chooseImg.naturalWidth) {
            this.showError('无法获取到图片的原始尺寸，请升级浏览器');
            return;
          }

          canvas.width = this.chooseImg.naturalWidth;
          canvas.height = this.chooseImg.naturalHeight;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(this.chooseImg, 0, 0, canvas.width, canvas.height);

          console.log(`图片质量：${this.quality}`);
          canvas.toBlob((blob) => {
            const formdata = new FormData();

            Object.keys(this.data).forEach((key) => {
              formdata.append(key, this.data[key]);
            });

            formdata.append('filename', this.chooseFile.name);

            formdata.append('file', blob);

            const xhr = new XMLHttpRequest();

            xhr.responseType = 'json';

            xhr.upload.onprogress = function onprogress(e) {
              if (e.lengthComputable) {
                const completedPercent = e.loaded / e.total;
              }
            };

            xhr.onload = () => {
              this.uploading = false;
              if (xhr.status === 200 || xhr.status === 304) {
                this.$emit('on-success', {
                  code: 0,
                  message: '上传成功！',
                  data: xhr.response.data,
                });
              } else {
                this.showError('服务器处理失败');
              }
            };

            xhr.onerror = function onerror() {
              this.showError('网络错误');
            };

            xhr.open('POST', this.action || this.uploadApi);

            xhr.send(formdata);
          }, 'image/jpeg', this.quality);
        }
      },
    },
    created() {
    },
  };
</script>

<style >
  .image-zip-upload{
    display: inline-block;
    position: relative;
  }
  .image-zip-upload [type=file]{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }
</style>
