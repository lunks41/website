import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"

import { useTranslation } from "react-i18next"
import Skeleton from "react-loading-skeleton"

import { ParamContext } from "@/contexts/ParamContext"

import { getFavoritesProducts } from "@/api/product"
import Good from "@/components/Good/Good"
import Banner from "@/components/Banner/Banner"

import "./index.scss"

const gift = () => {
  const router = useRouter()
  const { i18n } = useTranslation()
  const [products, setProducts] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pageSize, setPageSize] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { selectedLanguage } = useContext<any>(ParamContext)

  const getItems = async () => {
    setIsLoading(true)
    const params: any = {
      pageSize: 100,
      pageNumber: 1,
    }
    const { data, status }: any = await getFavoritesProducts(params)
    if (status === 200) {
      setProducts(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getItems()
  }, [selectedLanguage])

  return (
    <div className="search_result_main">
      <div className="container">
        <Banner />
        <div className="row mt-5">
          <div className="col-12 mb-5"></div>
        </div>
        <div className="row product_review_main">
          {isLoading ? (
            <>
              {[...Array(12)].map((el, index) => (
                <div
                  className="col-12 col-md-6 col-lg-3 mb-2"
                  key={`skeleton-items-${index}`}
                >
                  <div className="px-2">
                    <Skeleton height="350px" />
                    <Skeleton height="75px" className="mt-2" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {products.map((item: any, index: number) => {
                return (
                  <div
                    className="col-12 col-md-6 col-lg-3 mb-2"
                    key={`good-items-${index}`}
                  >
                    <Good key={index} item={item} hideFavorite={true} />
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default gift
