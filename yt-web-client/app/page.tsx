import { getVideos } from './firebase/functions'
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {

  const videos = await getVideos();

  return (
   <main className={styles.mainPage}>
    <ul className={styles.videoList}>
        {
          videos.map((video) => (
            <li className={styles.video}>
              <Link href={`/watch?v=${video.filename}`} key={video.id}>
                <div>
                  <img src={'/thumbnail.png'} alt='video'
                    className={styles.thumbnail} />
                  
                </div>
              </Link>
              <div className={styles.videoInfo}>
                    <img className={styles.FilmUserIMG} src="/noImageUser.png" alt='noUserImg'/>
                    <div>
                      <h2 className={styles.Title}>Title</h2>
                      <p className={styles.canalName}>Canal</p>
                    </div>
              </div>
            </li>
          ))
        }
      </ul>
    </main>
  )
}

export const revalidate = 30;