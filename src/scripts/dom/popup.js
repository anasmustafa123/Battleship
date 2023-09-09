const show = (className) => {
  document.querySelector(`.${className}`).classList.remove("hide");
};
const hide = (className) => {
  document.querySelector(`.${className}`).classList.add("hide");
};

export { show, hide };
