import NoSSR from './components/no-ssr';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Minesweeper from './components/grid';



export default function Home() {
  let size = 30;
  let data = Array(size).fill(false).map(() => new Array(size).fill(false).map(a => ({
    isMine: false,
    isSeen: false,
    value: ''
  })));

  for (var i =0; i < 1 * size; i++) {
    let x = Math.ceil(Math.random() * (size - 1));
    let y = Math.ceil(Math.random() * (size - 1));
    if (data[y][x].isMine === false) {
        data[y][x].isMine = true;
    }
  }
  data[10][29].isMine = true;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NoSSR>
          <Minesweeper data={data} />
        </NoSSR>
      </main>
    </>
  )
}
