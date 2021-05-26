

<template lang='pug'>
.footer
  .social-block
    a.social-link.insta(href='https://www.instagram.com/zakutokmediaru/' target='_blank')
      | Мы в Инстаграме
    a.social-link.telega(href='https://t.me/Koko3kote' target='_blank')
      | Мы в Телеграме

  .company-block
    .logo.zakutok
      | Мы в Инстаграме
    a.logo.copyright(href='http://kokovikhin.digital/' target='_blank')
      | Мы в Телеграме

</template>

<style lang='postcss'>
.footer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 62px;
  margin-top: 150px;

  @media (max-width: 660px) {
    margin-top: 90px;
  }
}

.social {
  &-block {
    display: flex;
    column-gap: 34px;
  }

  &-link {
    color: transparent;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: contain;
    height: 0;
    max-width: 116px;
    width: 100%;
    margin-bottom: 40px;

    &.insta {
      background-image: url(/logo/insta.svg);
      padding-bottom: 43%;
    }

    &.telega {
      background-image: url(/logo/telegram.svg);
      padding-bottom: 43%;
    }
  }
}

.company-block {
  text-decoration: none;
  max-width: 272px;
  width: 100%;
}
.logo {
    padding: 0;
    margin: 0;
    color: transparent;
    max-width: 272px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: contain;


  &.zakutok{
    background-image: url(/logo/zakutok.svg);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: contain;
    width: 100%;
    height: 0;
    padding-bottom: 26.8382352941%;
    /* 73 / (272 / 100) */
    margin-top: 2px;
    margin-bottom: 23px;

  }
  &.copyright{
    background-image: url(/logo/kokovikhin.svg);
    width: 100%;
    padding-bottom: 10.0988625492%;
    /* 19 / (188.14 / 100) */
  }
}
</style>