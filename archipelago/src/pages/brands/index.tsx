import { useEffect, useState } from "react"
import Link from "next/link"

import SecondHeader from "@/components/SecondHeader/SecondHeader"
import Skeleton from "react-loading-skeleton"

import { getPublicBrands } from "@/api/product"

import "./index.scss"

const brands = () => {
  const [brands, setBrands] = useState<any>([])
  const [isLoading, setIsLoading] = useState<any>(false)
  const getBrands = async () => {
    setIsLoading(true)
    const res = await getPublicBrands()
    setBrands(res)
    setIsLoading(false)
  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <div className="page-brands">
      <SecondHeader />
      <div className="container brands-container">
        <h4 className="text-uppercase">Brands</h4>
        <div className="row">
          {isLoading ? (
            <>
              {[...Array(12)].map((el, index: number) => (
                <div
                  className="col-12 col-lg-4 col-md-4 col-sm-2 text-center pb-3"
                  key={`brand-skeleton-item-${index}`}
                >
                  <Skeleton width="100%" height="446px" />
                </div>
              ))}
            </>
          ) : (
            <>
              {brands.length > 0 &&
                brands.map((brand: any, index: number) => (
                  <Link
                    href={`/search?brand=${brand?.id}`}
                    className="col-12 col-lg-4 col-md-4 col-sm-2 text-center pb-3 text-decoration-none"
                    key={`brand-item-${index}`}
                  >
                    <div className="w-100">
                      <img src={brand?.image} alt="brand" />
                    </div>
                    <p className="mt-2 mb-0 text-capitalize">{brand?.name}</p>
                  </Link>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default brands
