import { useParams } from "react-router-dom";

import { useGetByIdQuery } from "src/features/characters/api";

export function CharacterPage() {
  const res = useParams();
  const {currentData} = useGetByIdQuery(res.id);

  if(currentData) {
    return (
      <section>
          <div className="container rounded-2xl border-solid border-2 flex h-96 flex items-center bg-gradient-to-r from-green-500 to-green-100">
          <img src={currentData.image} className="h-[350px] ml-[15px] border-neutral-950 border-2 rounded-2xl" alt="charachter"/>
          <div className="flex h-[100%] ml-[30px] items-center">
            <section className="w-32 text-end mr-3 h-[90%] flex flex-col justify-around">
              <p className="text-3xl font-azonix">Name:</p>
              <p className="text-3xl">Status:</p>
              <p className="text-3xl">Species:</p>
              <p className="text-3xl">Gender:</p>
              <p className="text-3xl">Location:</p>
              <p className="text-3xl">Origin:</p>
            </section>
            <section className="h-[90%] flex flex-col justify-around">
              <p className="text-3xl font-bold">{currentData.name}</p>
              <p className="text-3xl font-bold">{currentData.status}</p>
              <p className="text-3xl font-bold">{currentData.species}</p>
              <p className="text-3xl font-bold">{currentData.gender}</p>
              <p className="text-3xl font-bold">{currentData.location.name}</p>
              <p className="text-3xl font-bold">{currentData.origin.name}</p>
            </section>
          </div>
        </div>
      </section>);
  }
}
