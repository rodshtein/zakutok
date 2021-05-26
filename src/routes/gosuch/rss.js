const renderXmlRssFeed = () => `<?xml version='1.0' encoding='UTF-8'?>
<rss
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:atom="http://www.w3.org/2005/Atom"
  version="2.0">
  <channel>
    <title>Gosuch</title>
    <description> Подкаст о людях, занимающихся интересным делом. Мы ничего не понимаем в том, что они делают, поэтому приглашаем их и разбираемся. Наш сайт zakutokmedia.ru </description>
    <copyright>СС BY-NC-ND 4.0</copyright>
    <language>ru</language>
    <link>https://zakutokmedia.ru/gosuch/rss</link>
    <atom:link
      href="https://zakutokmedia.ru/gosuch/rss"
      rel="self"
      type="application/rss+xml" />
    <itunes:subtitle>Говорим о крутых вещах в которых мы ничего не понимаем.</itunes:subtitle>
    <itunes:author>Лида Чапко, Никита Новосёлов, Костя Коковихин</itunes:author>
    <itunes:explicit>true</itunes:explicit>
    <itunes:owner>
      <itunes:name>Gosuch</itunes:name>
      <itunes:email>kk@kokovikhin.digital</itunes:email>
    </itunes:owner>
    <itunes:image href="https://zakutokmedia.ru/covers/gosuch.jpg" />
    <itunes:category text="Comedy">
      <itunes:category text="Comedy Interviews" />
    </itunes:category>
    <itunes:category text="Business">
      <itunes:category text="Careers" />
      <itunes:category text="Entrepreneurship" />
      <itunes:category text="Management" />
      <itunes:category text="Marketing" />
      <itunes:category text="Non-Profit" />
    </itunes:category>
    <item>
      <itunes:title>
        Она собирает ткани путешествуя по Италии
      </itunes:title>
      <title>В пилотном выпуске мы задаем глупые вопросы Наташе Балахонцевой. У неё есть «Мечта» — магазин тканей. Наташа пришла к нам и рассказала — с чего начинается мечта, зачем искать ткань в итальянской деревушке, и почему важно встретить своего мастера.</title>
      <pubDate>Mon, 27 May 2021 00:00:00 GMT</pubDate>
      <description>
        <![CDATA[
          <p>
            В пилотном выпуске мы задаем глупые вопросы Наташе Балахонцевой. У неё есть «Мечта» — магазин тканей. Наташа пришла к нам и рассказала — с чего начинается мечта, зачем искать ткань в итальянской деревушке, и почему важно встретить своего мастера.
            </p>
            <br>
            <p>
              Инстаграм «Мечты»
              <br>
              <a href="https://www.instagram.com/mechta_tkani/">mechta_tkani</a>
            </p>
            <br>
            <p>
              Наш сайт
              <br>
              <a href="https://zakutokmedia.ru/">zakutokmedia.ru</a>
            </p>
            <br>
            <p>
              Наш Инстаграм
              <br>
              <a href="https://www.instagram.com/zakutokmediaru/">zakutokmediaru</a>
            </p>
            <br>
            <p>
              Пишите нам в
              <br>
              <a href="https://t.me/Koko3kote">Телеграм</a>
            </p>

             ]]>
      </description>
      <guid isPermaLink="true">https://zakutokmedia.ru/shows/gosuch/1.mp3</guid>
      <enclosure type="audio/mpeg" url="https://zakutokmedia.ru/shows/gosuch/1.mp3" length="23235189" />
      <itunes:episode>1</itunes:episode>
      <itunes:duration>48:18</itunes:duration>
      <itunes:author>В гостях Наташа Балахонцева, ведущие: Лида Чапко, Никита Новосёлов, Костя Коковихин</itunes:author>
      <itunes:explicit>true</itunes:explicit>
      <itunes:summary>В этом выпуске мы задаем глупые вопросы о тканях Наташе Балахонцевой</itunes:summary>
      <itunes:image href="https://zakutokmedia.ru/covers/gosuch.jpg"/>
    </item>
  </channel>
</rss>`;

export function get() {
  const feed = renderXmlRssFeed();

  return {
    body: feed,
  };
}


