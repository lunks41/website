export default function getConfig() {
  let token = ""
  if (typeof window !== "undefined") {
    token =
      JSON.parse(localStorage.getItem("login_data")!)?.token ||
      JSON.parse(localStorage.getItem("login_data")!)?.stsTokenManager
        .accessToken
  }
  console.log('token',token)
  return {
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  }
}
