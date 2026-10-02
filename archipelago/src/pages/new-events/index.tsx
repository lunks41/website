import React from 'react'
import Link from "next/link";
import './index.scss'
import subNewsContent from '../../../subNews.json'
import { useRouter } from 'next/router'
import backError from "../../../public/images/news-events/backError.svg"
import leftArrow from "../../../public/images/news-events/leftArrow.svg"
import rightArrow from "../../../public/images/news-events/rightArrow.svg"
import n1 from "../../../public/images/news-events/n1.svg"
import n2 from "../../../public/images/news-events/n2.svg"
import n3 from "../../../public/images/news-events/n3.svg"
import n4 from "../../../public/images/news-events/n4.svg"
import n5 from "../../../public/images/news-events/n5.svg"
import n6 from "../../../public/images/news-events/n6.svg"
import n7 from "../../../public/images/news-events/n7.svg"
import n8 from "../../../public/images/news-events/n8.svg"
import n9 from "../../../public/images/news-events/n9.svg"
import n10 from "../../../public/images/news-events/n10.svg"
import n11 from "../../../public/images/news-events/n11.svg"
import n12 from "../../../public/images/news-events/n12.svg"



const index = () => {
  const router = useRouter();
  const cardImages = [
    n1,
    n2,
    n3,
    n4,
    n5,
    n6,
    n7,
    n8,
    n9,
    n10,
    n11,
    n12,
  ]
  return (
<>
    <div className="newsMain">
        <div className="backButton">
            <button className="w-100 bg-dark p-1" onClick={()=>router.back()}>
                <img src={backError.src} alt="Go back" className="w-100"/>
            </button>
        </div>
        <div className="newsDiv mt-3">
            <div className="sideTags mt-2">
                <p>
                    News
                </p>
            </div>
            <h1 className="sdContent mt-3">
                <b style={{ color: 'black' }}>Breaking Waves: Catch up on the Latest </b>Maritime News and Updates
            </h1>
        </div>
        <div className="newsCards mt-5">
            {subNewsContent.map((each,index) => {
              return (
                <Link className='myCardLinking text-decoration-none w-auto' key={index} href={{ pathname: '/sub-news', query: { index } }}>
                <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                    <img src={cardImages[index].src} className="card-img-top" alt={each?.headLine || `News article ${index + 1}`} />
                    <div className="cardBody card-body">
                        <h5 className="cardTitle card-title">{each?.headLine}</h5>
                        <p className="cardText card-text mb-0">{each?.paraOne}</p>
                        <p className="cardText card-text mb-0 mt-2">{each?.date}</p>
                    </div>
                </div>
              </Link>
              )
            })}


            {/* <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n2.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link>

            <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n3.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link>

            <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n4.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link> */}
            
        </div>

        {/* <div className="newsCards">
            <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n5.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link>

            <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n6.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link>

            <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n7.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link>

            <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n8.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link>
            
        </div>

        <div className="newsCards">
            <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n9.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link>

            <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n10.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link>

            <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n11.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link>

            <Link className='myCardLinking text-decoration-none w-auto' href={'/sub-news'}>
              <div className="mycard card p-2 w-100" style={{ width: '18rem' }}>
                  <img src={n12.src} className="card-img-top" alt="..."/>
                  <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="cardText card-text mb-0 mt-2">01/04/202</p>
                  </div>
              </div>
            </Link>
            
        </div> */}

        <div className="myPagination w-100 mt-3">
          <nav aria-label="mypageNav Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link text-black previous" href="#">
                <img src={leftArrow.src} alt=""/>
                Previous</a></li>
              <li className="page-item"><a className="page-link text-black" href="#">1</a></li>
              <li className="page-item"><a className="page-link text-black" href="#">2</a></li>
              <li className="page-item"><a className="page-link text-black" href="#">3</a></li>
              <li className="page-item"><a className="page-link text-white nextele" href="#">
                Next
                <img src={rightArrow.src}  alt=""/>
              </a></li>
            </ul>
          </nav>
        </div>
    </div>
</>

  )
}

export default index