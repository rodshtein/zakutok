<script context="module">
  export const prerender = true;
</script>

<script>
import PhotoKostia from '$lib/team/kostia.png?w=120;240&srcset'
import PhotoLida from '$lib/team/lida.png?w=120;240&srcset'
import PhotoNikita from '$lib/team/nikita.png?w=120;240&srcset'
</script>

<svelte:head>
  <title>Zakutok.media | Gosuch</title>
</svelte:head>



<template lang='pug'>
section#gosuch.podcast
  h1.logotype.gosuch Gosuch
  .description_block
    p.p.text
      | Подкаст о людях, за&shy;ни&shy;маю&shy;щихся инте&shy;ре&shy;сным делом. Мы ни&shy;чего не понимаем в том, что они делают, поэтому при&shy;глаш&shy;аем их и разбирае&shy;мся


    .host-block
      .host
        img(
          alt='Костя, соведущий'
          srcset!='{PhotoKostia}' type="image/webp"
          width='120px'
          height='120px'
          )
        a(href='https://www.instagram.com/koko3kote/' target='_blank') Костя
          span Соведущий
      .host
        img(
          alt='Никита, соведущий'
          srcset!='{PhotoNikita}' type="image/webp"
          width='120px'
          height='120px'
          )
        a.host(href='https://www.instagram.com/nn_sergeevich/' target='_blank') Никита
          span Соведущий
      .host
        img(
          alt='Лида, соведущая'
          srcset!='{PhotoLida}' type="image/webp"
          width='120px'
          height='120px'
          )
        a.host(href='https://www.instagram.com/pihora/' target='_blank') Лида
          span Соведущая

  h2.h3 Послушать
  .links
    a(href='https://www.youtube.com/playlist?list=PL1n0DH3VhKrxbBd4XTY8dGk79_uWtgo1w' target='_blank') YouTube
    a(href='https://podcasts.apple.com/us/podcast/gosuch/id1570029023' target='_blank') Apple Podcasts
    a(href='https://music.yandex.ru/album/15843216' target='_blank') Я.Музыка
    a(href='https://podcasts.google.com/feed/aHR0cHM6Ly96YWt1dG9rbWVkaWEucnUvZ29zdWNoL3Jzcw==' target='_blank') Google Podcasts
    a(href='https://open.spotify.com/show/3CHBF0gw04uwxM6ESqlz2j' target='_blank') Spotify
    a(href='https://pca.st/bmpwc9yv' target='_blank') Pocket Casts
    a(href='https://overcast.fm/itunes1570029023/gosuch' target='_blank') Overcast
    a(href='https://castro.fm/podcast/ef8db0ee-5698-4f01-a65e-40073c0ca41e' target='_blank') Castro
    a(href='https://radiopublic.com/gosuch-6rj7RK' target='_blank') Radio Public
    a(href='https://zakutokmedia.ru/gosuch/rss' target='_blank') RSS

</template>


<style lang='postcss'>
.podcast {
  margin-bottom: 150px;
  @media ( width < 900px ){
    margin-bottom: 100px;
  }
  @media ( width < 600px ){
    margin-bottom: 60px;
  }
}

.logotype {
  color: transparent;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: contain;
  width: 100%;
  height: 0;

  &.gosuch {
    background-image: url(/logo/gosuch.svg);
    padding-bottom: 19.9645075421%;
    /* 225/(1127 / 100) */
    margin-bottom: -20px;
    @media ( width < 900px ){
      background-image: url(/logo/gosuch--s.svg);
      padding-bottom: 59.364548495%;
      /* 355 / (598/ 100) */
    }
  }
}

.description_block {
  display: flex;
  padding-top: 35px;
  margin-bottom: 60px;
  @media ( width > 1280px ){
    margin-bottom: 90px;
  }
  @media ( width < 900px ){
      flex-direction: column;
      row-gap: 35px;
  }

  .text {
    font-family: Golos;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 110%;
    letter-spacing: 0em;
    text-align: left;
    padding-top: 10px;
    margin: 0;
    text-transform: uppercase;

    @media ( width > 1280px ){
      font-size: 50px;
    }
    @media ( width < 740px ){
      font-size: 28px;
    }
    @media ( width < 580px ){
      font-size: 26px;
      ine-height: 32px;
    }
  }
}

.host-block {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  flex: 1 0 auto;
  padding-left: 120px;
  margin-bottom: 20px;

  @media ( width < 900px ){
    flex-direction: row;
    padding-left: 0;
    .host{
      a {
        left: 12px;
        text-align: left;
        span {
          text-align: left;
        }
      }
      img {
        margin-left: 0px;
      }
    }
  }
}


.host {
  position: relative;
  z-index: 1;

  a {
    position: absolute;
    padding: 0;
    margin: 0;
    right: 12px;
    font-family: Golos;
    font-size: 28px;
    font-style: normal;
    font-weight: 900;
    line-height: 110%;
    letter-spacing: 0em;
    text-transform: uppercase;
    text-align: right;
    color: var(--color-link);
    display: none;

    @media ( width > 1280px ){
      right: 43px;
      font-size: 48px;
    }

    span {
      display: block;
      font-family: Golos;
      font-size: 21px;
      font-style: normal;
      font-weight: 500;
      line-height: 26px;
      letter-spacing: 0em;
      text-align: right;
      text-transform: uppercase;
      white-space: nowrap;

      @media ( width > 1280px ){
        ont-size: 26px;
      }
    }
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      top: -20px;
      left: 0;
      right: -12px;
      opacity: 0.5;

      @media ( width > 1280px ){
        right: -41px;
      }
    }
    &::after {
      content: '';
      position: absolute;
      width: 40px;
      height: 40px;
      background-image: url(/logo/insta.svg);
      background-repeat: no-repeat;
      background-position: 0 0;
      background-size: contain;
      top: -57px;
      right: 34px;

      @media ( width > 1280px ){
        width: 80px;
        height: 80px;
        top: -99px;
        right: 44px;
      }
    }
  }

  &:hover {
    text-decoration: none;
    z-index: 2;

    & ~ div {
      opacity: .3;
    }

    img {
      border: 8px solid var(--color-borders);
    }

    a {
      display: block;
      text-decoration: none;

      &::before {
        display: block;
      }
    }
  }

  img{
    width: 136px;
    height: 136px;
    border-radius: 50%;
    margin-left: -29px;
    border: 8px solid rgba(0,0,0,0);

    @media ( width > 1280px ){
      margin-left: -60px;
      width: 256px;
      height: 256px;
    }
  }
}

.h3 {
  margin-bottom: 15px;
  @media ( width > 1280px ){
      font-size: 65px;
      margin-bottom: 40px;
  }
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  row-gap: 10px;
  column-gap: 25px;
  @media ( width > 1280px ){
    row-gap: 35px;
    column-gap: 50px;
  }

  a {
    font-family: Golos;
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: 38px;
    letter-spacing: 0em;
    text-align: left;
    color: var(--color-link);
    text-transform: uppercase;

    @media ( width > 1280px ){
      font-size: 60px;
      text-transform: none;
    }
  }
}
</style>
