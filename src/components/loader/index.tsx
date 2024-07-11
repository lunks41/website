import { Triangle, TailSpin } from "react-loader-spinner";
import "./index.scss";

// export const LazyLoader = () => {
//   return (
//     <div className="loader-main">
//       <Triangle
//         height="80"
//         width="80"
//         color="#d60000"
//         ariaLabel="triangle-loading"
//         visible={true}
//       />
//     </div>
//   );
// };

export const ButtonLoader = ({}) => {
  return <TailSpin
          height="1.5rem"
        //   color={color ? color : "white"}
          radius="2"
          wrapperClass="loader-button"
          visible={true}
        />
}
