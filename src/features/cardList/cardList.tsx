import Image from "next/image";
import CardLoading from "./cardLoading/CardLoading";
import { FaImages } from "react-icons/fa";

type Props = {
  isLoading: boolean;
  cardList: string[];
};

const CardList = ({ isLoading, cardList }: Props) => {
  return (
    <>
      <h2
        className="text-2xl flex items-center pb-4"
        style={{ fontFamily: "Beleren" }}
      >
        <FaImages className="mr-2" />
        Card Library
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <CardLoading />
        </div>
      ) : (
        <div>
          {cardList && cardList.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cardList.map((cardUrl) => (
                <div
                  key={cardUrl}
                  className="mb-2.5 transform transition-transform hover:scale-150 hover:z-10"
                >
                  <Image
                    src={cardUrl}
                    alt="Back MTG card"
                    width={252}
                    height={360}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center p-8 text-center text-gray-100">
              No cards have been saved yet. Please, create and save your first
              card.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export { CardList };
