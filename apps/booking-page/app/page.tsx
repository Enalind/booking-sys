"use client";
import Head from 'next/head'
import Image from 'next/image'
import styles from './styles.module.css'
import hairstyling from '../public/hairstyling.jpg'
import { Merienda_One, Koulen } from 'next/font/google'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

const merienda_one_font = Merienda_One({weight: "400", subsets: ["latin"]})
const koulen_font = Koulen({weight: "400", subsets: ["latin"]})

export default function Home() {

  const titleSectionRef = useRef(null)
  const subheadingRef = useRef(null)
  const bookButtonRef = useRef(null)
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      var percent = (e.clientX)/window.innerWidth*100
      
      if(titleSectionRef.current !== null){
        titleSectionRef.current.style.width = `calc(${percent}vw)`
        subheadingRef.current.style.width = `calc(${percent}vw - 150px)`
        bookButtonRef.current.style.width = `calc(100vw - ${percent}vw - 215px)`
      }
    })
  }, [])
  return (
  <div className={styles.main} style={{backgroundImage: `url(${hairstyling.src})`}}>
   
      <div className={`${styles.titleSection} ${styles.titleSectionAbove}`} ref={titleSectionRef}>
        <h1 className={`${koulen_font.className} ${styles.title} ${styles.titleAbove}`}>Frisör</h1>
        <h2 className={`${merienda_one_font.className} ${styles.subtitle} ${styles.subtitleAbove}`}>Demo</h2>
      </div>
      <div className={`${styles.titleSection} ${styles.titleSectionBelow}`}>
        <h1 className={`${koulen_font.className} ${styles.title} ${styles.titleBelow}`}>Frisör</h1>
        <h2 className={`${merienda_one_font.className} ${styles.subtitle} ${styles.subtitleBelow}`}>Demo</h2>
      </div>
      <div className={`${styles.subheading} ${styles.subheadingAbove}`} ref={subheadingRef}>
        <h3 className={`${koulen_font.className} ${styles.service} ${styles.serviceAbove}`}>Högkvalitativ Service</h3>
        <h4 className={`${merienda_one_font.className} ${styles.prices} ${styles.pricesAbove}`}>Låga priser</h4>
      </div>
      <div className={`${styles.subheading} ${styles.subheadingBelow}`}>
        <h3 className={`${koulen_font.className} ${styles.service} ${styles.serviceBelow}`}>Högkvalitativ Service</h3>
        <h4 className={`${merienda_one_font.className} ${styles.prices} ${styles.pricesBelow}`}>Låga priser</h4>
      </div>
      <div>
        <div className={`${styles.bookButton} ${styles.bookButtonAbove}`} ref={bookButtonRef}>
          <b className={`${styles.bookButtonText} ${styles.bookButtonTextAbove} ${koulen_font.className}`}>Boka Nu</b>
        </div>
        <div className={`${styles.bookButton} ${styles.bookButtonBelow}`}>
          <Link href={"/book"} className={`${styles.bookButtonText} ${styles.bookButtonTextBelow} ${koulen_font.className}`}>Boka Nu</Link>
        </div>
      </div>
  </div>
  )
}
