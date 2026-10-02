import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import b2bicon  from "../../assets/b2b.svg"

import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { ParamContext } from "@/contexts/ParamContext";

const SecondHeader = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { isCategoryLoading, categories } = useContext<any>(ParamContext);
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    setPath(router.asPath);
  }, [router]);
  return (
    <>
    </>
  )
  // return (
  //   <div className="text-center header-second">
  //     <div className="d-flex p-1 pb-3 m-0">
  //       <div className="container px-4 text-center">
  //         {isCategoryLoading ? (
  //           <div className="d-flex justify-content-center gap-5 flex-wrap">
  //             {[...Array(8)].map((el, index) => (
  //               <div key={`skeleton-${index}`} className="text-center mt-1">
  //                 <Skeleton circle={true} height="40px" width="40px" />
  //                 <Skeleton height="15px" width="90px" className="mt-1" />
  //               </div>
  //             ))}
  //           </div>
  //         ) : (
  //           <div className="d-flex justify-content-center gap-5 flex-wrap">
  //             <Link
  //               href="/catering"
  //               className={`header-position-relative ${
  //                 path.includes("/catering") ? "link-active" : ""
  //               }`}
  //             >
  //               <div className="header-second-item">
  //                 <img
  //                   src="/images/icons/header_icons/food-service1.png"
  //                   alt=""
  //                 />
  //                 <p>{t("CATERING")}</p>
  //               </div>
  //               {isSubItem && (
  //                 <div className="header-second-item-absolute">
  //                   <Link
  //                     href="/catering"
  //                     className={`sub-menu-title-main ${
  //                       path.includes("/catering") ? "link-active" : ""
  //                     }`}
  //                   >
  //                     <div className="header-second-item">
  //                       <img
  //                         src="/images/icons/header_icons/catering_icon.png"
  //                         alt=""
  //                       />
  //                       <p>{t("CATERING")}</p>
  //                     </div>
  //                     <div style={{ width: "9px", height: "auto" }}>
  //                       <img
  //                         src="/images/icons/header_icons/Vector.svg"
  //                         alt="next arrow"
  //                         style={{ width: "100%" }}
  //                         className="arrow-img-main"
  //                       />
  //                     </div>
  //                   </Link>
  //                   <Link
  //                     href="/catering"
  //                     className={`sub-menu-title-main ${
  //                       path.includes("/catering") ? "link-active" : ""
  //                     }`}
  //                   >
  //                     <div className="header-second-item">
  //                       <img
  //                         src="/images/icons/header_icons/catering_icon.png"
  //                         alt=""
  //                       />
  //                       <p>{t("CATERING")}</p>
  //                     </div>
  //                     <div style={{ width: "9px", height: "auto" }}>
  //                       <img
  //                         src="/images/icons/header_icons/Vector.svg"
  //                         alt="next arrow"
  //                         style={{ width: "100%" }}
  //                         className="arrow-img-main"
  //                       />
  //                     </div>
  //                   </Link>
  //                 </div>
  //               )}
  //             </Link>
  //             <Link
  //               href="/photoshoot"
  //               className={`header-position-relative ${
  //                 path.includes("/photoshoot") ? "link-active" : ""
  //               }`}
  //             >
  //               <div className="header-second-item">
  //                 <img
  //                   src="/images/icons/header_icons/Vector.png"
  //                   alt=""
  //                 />
  //                 <p>{t("PHOTOSHOOT")}</p>
  //               </div>
  //             </Link>

  //             {categories &&
  //               categories.length > 0 &&
  //               categories.map((item: any, index: any) => {
  //                 return (
  //                   <Link
  //                     href={`/product-category?id=${item?.id}&name=${item?.name}`}
  //                     key={`product-category-${index}`}
  //                     className={`header-position-relative ${
  //                       path.includes(item?.alias) ? "link-active" : ""
  //                     }`}
  //                   >
  //                     <div className="header-second-item">
  //                       <img
  //                         src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${item.image}`}
  //                         alt="not found"
  //                       />
  //                       <p className="text-uppercase">{t(item.name)}</p>
  //                     </div>
  //                     <div className="header-second-item-absolute">
  //                       {item?.categories &&
  //                         item?.categories.length > 0 &&
  //                         item?.categories.map((subItems: any, index: any) => {
  //                           return (
  //                             <Link
  //                               href={`/products?id=${subItems?.id}&name=${subItems?.name}`}
  //                               key={`products-${index}`}
  //                               className={`sub-menu-title-main ${
  //                                 path.includes(subItems?.alias)
  //                                   ? "link-active"
  //                                   : ""
  //                               }`}
  //                             >
  //                               <div className="header-second-sub-item">
  //                                 <img
  //                                   src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${subItems?.image}`}
  //                                   alt="not found"
  //                                 />
  //                                 <p>{t(subItems?.name)}</p>
  //                               </div>
  //                               <div style={{ width: "7px", height: "auto" }}>
  //                                 <img
  //                                   src="/images/icons/header_icons/Vector.svg"
  //                                   alt="next arrow"
  //                                   style={{ width: "100%" }}
  //                                   className="arrow-img-main"
  //                                 />
  //                               </div>
  //                             </Link>
  //                           );
  //                         })}
  //                     </div>
  //                   </Link>
  //                 );
  //               })}
  //                <Link
  //               href="/balloons-business"
  //               className={`header-position-relative ${
  //                 path.includes("/balloons-business") ? "link-active" : ""
  //               }`}
  //             >
  //               <div className="header-second-item">
  //                 <Image
  //                   src={b2bicon}
  //                   alt=""
  //                 />
  //                 <p>{t("B2B")}</p>
  //               </div>
               
  //             </Link>
  //             <Link
  //               href="/reservations"
  //               className={`header-position-relative ${
  //                 path.includes("/reservations") ? "link-active" : ""
  //               }`}
  //             >
  //               <div className="header-second-item">
  //                 <img
  //                   src="/images/icons/header_icons/reservation.svg"
  //                   alt=""
  //                 />
  //                 <p>{t("RESERVATIONS")}</p>
  //               </div>
  //             </Link>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default SecondHeader;
