class LoadingView {
  constructor() {
    this.loadingEl = document.querySelector(".loading");
  }

  showLoading = () => {
    this.loadingEl.classList.add("open");
  };

  closeLoading = () => {
    this.loadingEl.classList.remove("open");
  };
}

export default LoadingView;
