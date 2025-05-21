import img1 from "../assets/shape/grid-01.svg"
export default function GridShape() {
    return (
      <>
        <div className="absolute right-0 top-0 -z-1 w-full max-w-[750px] xl:max-w-[850px]">
          <img src={img1} alt="grid" />
        </div>
        <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[350px] rotate-180 xl:max-w-[850px]">
          <img src={img1} alt="grid" />
        </div>
      </>
    );
  }
  