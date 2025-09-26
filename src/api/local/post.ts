interface IPostRequestResponse {
  status: number,
  message: string
};

const postRequest = async (data: FormData): Promise<IPostRequestResponse | undefined> => {
  try {
    const response = await fetch("/?show=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //await response.json();

    return {
      status: 200,
      message: "File successfully uploaded"
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default postRequest;
