export const cloudinaryUploadImage = async (
  cloudinaryConfig: any,
  base64: string
) => {
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig;
  const formData = new FormData();
  formData.append("file", `data:image/png;base64,${base64}`);
  formData.append("upload_preset", "indblog");
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(apiKey + ":" + apiSecret)}`,
      },
      body: formData,
    }
  );

  const result: any = await response.json();
  return result;
};
