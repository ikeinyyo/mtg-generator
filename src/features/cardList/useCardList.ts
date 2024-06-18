import { useMutation } from "@tanstack/react-query";

const useCardList = (
  onSuccess: (cardsUrls: string[]) => void,
  onError: () => void
) =>
  useMutation<string[], Error>({
    mutationFn: () => {
      return fetch("/api/listCards").then((response) => {
        return response.json();
      });
    },
    onSuccess: onSuccess,
    onError: onError,
  });

export default useCardList;
