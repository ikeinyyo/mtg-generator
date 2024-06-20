import { useMutation } from "@tanstack/react-query";

const useSaveCard = (
  onSuccess: (cardUrl: string) => void,
  onError: (error: Error) => void
) => {
  return useMutation<string, Error, string>({
    mutationFn: async (saveCardRequest: string) => {
      const response = await fetch("/api/saveCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardUrl: saveCardRequest }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error uploading the image");
      }

      const data = await response.json();
      return data.url;
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error) => {
      onError(error);
    },
  });
};

export default useSaveCard;
