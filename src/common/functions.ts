import router from "@/router";

// 返回登陆页
export function goLoginPage() {
  router.push("/auth/login");
}

// 返回主页
export function goHomePage() {
  router.push("/app/homepage");
}

// 404错误页
export function go404() {
  router.push("/error/404");
}

// 全路径中截取一级路径
export function sliceRootPath(fullpath: string) {
  return '/' + fullpath?.split('/')[1];
}

export function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}
