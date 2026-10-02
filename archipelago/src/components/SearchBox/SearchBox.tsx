import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

import { useTranslation } from "react-i18next";
import { ParamContext } from "@/contexts/ParamContext";

import "./SearchBox.scss";

export default function SearchBox() {
  const router = useRouter();
  const { t } = useTranslation();
  const { key, categories, services } = router.query;
  const [searchKey, setSearchKey] = useState<string>("");
  const { pageName } = useContext<any>(ParamContext);

  const { name: initialName,id } = router.query;
  const currentPath = router.pathname;
  const lastPart = currentPath.substring(1);
  const [placeholderName, setPlaceholderName] = useState<any>("");

  useEffect(()=>{
    if (initialName) {
     setPlaceholderName(initialName)
    }else if(lastPart == "outlet/[slug]"){
      setPlaceholderName("Menu")
    }else if(lastPart == "order-detail/[slug]"){
      setPlaceholderName("Order-Detail")
    }  else if(lastPart){
      setPlaceholderName(lastPart)
    }else{
      setPlaceholderName("Search")
    }
    
  })

  const navigateBackFunction = () => {
    router.push('/');
  }

  const handlePressEnter = (e: any) => {
    if (e.keyCode === 13 && searchKey) {
      switch (pageName) {
        case "catering":
          const cateringParams: any = { key: searchKey };
          if (categories) {
            cateringParams.categories = categories;
          }
          if (services) {
            cateringParams.services = services;
          }
          router.push({
            pathname: "/restaurant",
            query: cateringParams,
          });
          break;
        case "photoshoot":
          const photoParams: any = { key: searchKey };
          if (router.query.id) {
            photoParams.id = router.query.id;
          }
          router.push({
            pathname: "/photoshoot-search",
            query: photoParams,
          });
          break;
        default:
          router.push(`/search?key=${searchKey}`);
          break;
      }
    } else if (e.keyCode === 13 && !searchKey) {
      // Handle case when search key is empty
      navigateBackFunction(); 
    }
  }
  
  const handleSearchChange = (e: any) => {
    const target = e.target;
    setSearchKey(target.value);
  }

  useEffect(() => {
    if (!key) {
      setSearchKey("");
    } else {
      setSearchKey(key.toString());
    }
  }, [key]);

  return (
    <div className="bordered-input">
      <input
        className="form-control header_search"
        type="text"
        placeholder={`${t(placeholderName)}`}
        value={searchKey}
        onChange={(e: any) => handleSearchChange(e)}
        onKeyDown={(e: any) => handlePressEnter(e)}
      />
      <Link href="/">
       
          <img
            className="search_icon"
            src="/images/icons/header_icons/Search_icon.svg"
            alt=""
          />
      
      </Link>
    </div>
  );
}
