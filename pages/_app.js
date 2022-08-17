import '../styles/globals.css'
import '../styles/Home.css'
import { AppWrapper } from '../context/AppContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {

  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

// MyApp.getInitialProps = async ({ Component, router, ctx }) => {
//   var url = process.env.NEXT_PUBLIC_BASE_URL + "/api/machines";
//   console.log(url)
//   const response = await fetch(url)
//   const data = await response.json()

//   var machineWithoutTime = data.find(machine => machine.pumpname && machine.time == null)
  
//   if (ctx.res && !ctx.pathname.startsWith("/choosetime")) {
//     if (machineWithoutTime != undefined) {
//       ctx.res.writeHead(301, {
//         Location: '/choosetime/' + machineWithoutTime.id
//       });
//       ctx.res.end();
//     }
//   }

//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

export default MyApp