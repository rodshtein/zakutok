import { readFileSync, writeFileSync, statSync } from 'fs';
import * as ID3Reader from 'node-id3';
import * as prettydata from 'pretty-data';
import * as normalize from 'normalize-html-whitespace';

const siteUrl = 'https://zakutokmedia.ru/';
const showUrl = 'shows/gosuch/';
const audioFormat = '.mp3';
const audioType = 'audio/mpeg';
const ID3_cache = {};

function getAudioTags(fileName, format = audioFormat){
  let path = './static/' + showUrl + fileName + format;
  if(path in ID3_cache) return ID3_cache[path]

  const tags = ID3Reader.read(path,  {
    noRaw: true,
  })

  ID3_cache[path] = tags
  return tags
}

function getDescription(text){
  let html = `<![CDATA[${text}]]>`;
  // let html = `<![CDATA[${normalize(text)}]]>`;
  let description = `<description>${html}</description>`;
  // we dublicate summary, because apple hides description if there is a summary
  // but if we have no summary we cant see subtitle
  // summary temporary disabled
  let summary = `<itunes:summary>${html}</itunes:summary>`;
   return description
}

function getFileTag(fileName, {
  format = audioFormat,
  type = audioType
}={}){
  const stats = statSync('./static/' + showUrl + fileName + format);
  let fileUrl = siteUrl + showUrl + fileName + format;
  let tag = `
    <guid isPermaLink="true">${fileUrl}</guid>
    <enclosure url="${fileUrl}"  length="${stats.size}" type="${type}"/>`;
  return tag
};

function getDuration(fileName, format = audioFormat){
  let seconds = getAudioTags(fileName, format).length/1000;
  return `<itunes:duration>${seconds}</itunes:duration>`
}

function paintChapters(fileName, format = audioFormat){
  let chapter = getAudioTags(fileName, format).chapter
  if(!chapter || !chapter.length) return '';

  const chapters = chapter.reduce((prev, item) => {
      let title = item.tags.title
        ? `title="${item.tags.title}"`
        : '';
      let time = item.startTimeMs
        ? `start="${getChapterTime(item)}"`
        : '';

      return time || title
        ? `${prev} <psc:chapter ${time} ${title} />`
        : ''
    }, '' );

  const tag = chapters
    ? `<psc:chapters>${chapters}</psc:chapters>`
    : '';
  return tag
}

function getChapterTime(item){
  let startTimeMs = parseFloat(item.startTimeMs);
  return new Date(startTimeMs).toISOString().substr(11, 8);
}

function getRssFeed(){
  let feed = null;

  try{
    feed = readFileSync('src/routes/gosuch/_cached_RSS', 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found!');
    } else {
      throw err;
    }
  }

  return feed ? feed : buildFeed();
}

function buildFeed(){
  const feed = prettydata.pd.xmlmin(`<?xml version='1.0' encoding='UTF-8'?>
    <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="https://search.yahoo.com/mrss/" xmlns:dcterms="https://purl.org/dc/terms/" xmlns:spotify="https://www.spotify.com/ns/rss" xmlns:psc="https://podlove.org/simple-chapters/" >
    <channel>
      <title>Gosuch</title>

      <itunes:title>Gosuch</itunes:title>
      <link>https://zakutokmedia.ru/gosuch</link>
      <atom:link href="https://zakutokmedia.ru/gosuch/rss" rel="self" type="application/rss+xml"/>
      ${getDescription(
        `Подкаст о людях, которые занимаются интересными делами. Мы ничего в этом не понимаем, поэтому вопросами глупыми их пытаем.
<br><br>

<strong>Ведущие шоу:</strong><br>
Лида Чапко, Никита Новосёлов, Костя Коковихин<br>

<strong>Наш сайт:</strong><br>
https://zakutokmedia.ru/gosuch<br>

<strong>Наш инстаграм:</strong><br>
https://instagram.com/gosuchornotgosuch<br>

<strong>Пишите нам в Телеграм:</strong><br>
https://t.me/Koko3kote`
      )}
      <image>
        <title>Gosuch Подкаст</title>
        <link>https://zakutokmedia.ru/gosuch</link>
        <url>https://zakutokmedia.ru/covers/gosuch.jpg</url>
      </image>
      <itunes:author>Лида Чапко, Никита Новосёлов и Костя Коковихин</itunes:author>
      <copyright>СС BY-NC-ND 4.0</copyright>
      <language>ru</language>
      <spotify:countryOfOrigin>ru</spotify:countryOfOrigin>
      <managingEditor>kk@kokovikhin.digital (Костя Коковихин)</managingEditor>
      <webMaster>mz@kokovikhin.digital (Миша Родштейн)</webMaster>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <ttl>60</ttl>
      <itunes:explicit>yes</itunes:explicit>
      <itunes:type>episodic</itunes:type>
      <itunes:owner>
        <itunes:name>Zakutok Media</itunes:name>
        <itunes:email>kk@kokovikhin.digital</itunes:email>
      </itunes:owner>
      <itunes:image href="https://zakutokmedia.ru/covers/gosuch.jpg"/>
      <itunes:category text="Comedy">
      <itunes:category text="Comedy Interviews" />
      </itunes:category>
      <itunes:category text="Business">
        <itunes:category text="Non-Profit" />
        </itunes:category>
      <item>
        <itunes:episodeType>full</itunes:episodeType>
        <itunes:episode>1</itunes:episode>
        <title>Пилотный выпуск</title>
        <itunes:author>Лида Чапко, Никита Новосёлов и Костя Коковихин</itunes:author>
        <itunes:subtitle>Поговорили о тканях с Наташей Балахонцевой</itunes:subtitle>
        <itunes:explicit>yes</itunes:explicit>
        <itunes:keywords>владивосток, ткани, бизнес, пошив, портной</itunes:keywords>
        <itunes:image href="https://zakutokmedia.ru/shows/gosuch/1.jpg"/>
        <link>https://zakutokmedia.ru</link>
        <pubDate>Thu, 27 May 2021 00:00:00 GMT</pubDate>
        ${getDescription(
          `<strong>Поговорили о тканях с Наташей Балахонцевой.</strong>
<br><br>

У Наташи есть «Мечта» — магазин тканей. Наташа пришла к нам и рассказала — с чего начинается мечта, зачем искать ткань в итальянской деревушке, и почему важно встретить своего мастера.
<br><br>

<strong>Гость выпуска:</strong><br>
Наташа Балахонцева<br>

<strong>Ведущие выпуска:</strong><br>
Лида Чапко, Никита Новосёлов, Костя Коковихин<br>

<strong>Инстаграм «Мечты»:</strong><br>
https://instagram.com/mechta_tkani<br>

<strong>Наш сайт:</strong><br>
https://zakutokmedia.ru/gosuch<br>

<strong>Наш инстаграм:</strong><br>
https://instagram.com/gosuchornotgosuch<br>

<strong>Пишите нам в Телеграм:</strong><br>
https://t.me/Koko3kote`
        )}
        ${getFileTag('1')}
        ${getDuration('1')}
        ${paintChapters('1')}
      </item>

      <item>
        <itunes:episodeType>full</itunes:episodeType>
        <itunes:episode>2</itunes:episode>
        <title>Диана Лютер, издатель, детский автор и предприниматель</title>
        <itunes:author>Лида Чапко, Никита Новосёлов и Костя Коковихин</itunes:author>
        <itunes:subtitle>Поговорили о книгах с Дианой Лютер</itunes:subtitle>
        <itunes:explicit>yes</itunes:explicit>
        <itunes:keywords>владивосток, книги, бизнес, чтение, издательство, литература, писатели</itunes:keywords>
        <itunes:image href="https://zakutokmedia.ru/shows/gosuch/2.jpg"/>
        <link>https://zakutokmedia.ru</link>
        <pubDate>Thu, 01 Jul 2021 18:00:00 GMT+1000</pubDate>
        ${getDescription(
          `<strong>Поговорили о книгах и издательстве с Дианой Лютер.</strong>
<br><br>

Диана Лютер, издатель, детский автор и совладелица магазинов «Игра слов», «Лютература».
<br><br>

«Игра слов» ставит для себя цель предложить не только популярную литературу, но и открыть для читателей книги порядка полусотни независимых издательств, а также десятки периодических изданий, которые практически не добираются до местного читателя, так как редко попадают на полки книжных супермаркетов.
<br><br>

<strong>Гость выпуска:</strong><br>
Диана Лютер<br>

<strong>Ведущие выпуска:</strong><br>
Лида Чапко, Никита Новосёлов, Костя Коковихин<br>

<strong>Инстаграм Дианы:</strong><br>
https://instagram.com/lyuter<br>

<strong>Инстаграм Игры слов:</strong><br>
https://instagram.com/igraslov.bookstore<br>

<strong>Инстаграм Лютературы:</strong><br>
https://instagram.com/lyuteratura<br>

<strong>Наш сайт:</strong><br>
https://zakutok.media/gosuch<br>

<strong>Наш инстаграм:</strong><br>
https://instagram.com/gosuchornotgosuch<br>

<strong>Пишите нам в Телеграм:</strong><br>
https://t.me/Koko3kote`
        )}
        ${getFileTag('2')}
        ${getDuration('2')}
        ${paintChapters('2')}
      </item>

      <item>
        <itunes:episodeType>full</itunes:episodeType>
        <itunes:episode>3</itunes:episode>
        <title>Темно — спать, музыка — танцевать, кофе — пить!</title>
        <itunes:author>Лида Чапко, Никита Новосёлов и Костя Коковихин</itunes:author>
        <itunes:subtitle>Каталиной Школа, компания «Кафема»</itunes:subtitle>
        <itunes:explicit>yes</itunes:explicit>
        <itunes:keywords>владивосток, кофе, бизнес, бариста, турка, Кафема</itunes:keywords>
        <itunes:image href="https://zakutokmedia.ru/shows/gosuch/3.jpg"/>
        <link>https://zakutokmedia.ru</link>
        <pubDate>Thu, 22 Jul 2021 11:03:05 GMT+1000</pubDate>
        ${getDescription(
          `<strong>Темно — спать, музыка — танцевать, кофе — пить!</strong>
<br><br>

Болтаем с Каталиной из «Кафемы»: обсуждаем ритуалы, делимся наблюдениями, узнаём откуда кофе в «Кафеме», спрашиваем, что такое хороший и плохой кофе. Прикалываемся над чемпионом мира по варению кофе в турке.
<br><br>


<strong>Гость выпуска:</strong><br>
Каталиной Школа, компания «Кафема»<br>

<strong>Ведущие выпуска:</strong><br>
Лида Чапко, Никита Новосёлов, Костя Коковихин<br>

<strong>Инстаграм Каталины:</strong><br>
https://instagram.com/katalina_more_coffee<br>

<strong>Инстаграм Кафемы:</strong><br>
https://www.instagram.com/kafema_coffee/<br>

<strong>Наш сайт:</strong><br>
https://zakutok.media/gosuch<br>

<strong>Наш инстаграм:</strong><br>
https://instagram.com/gosuchornotgosuch<br>

<strong>Пишите нам в Телеграм:</strong><br>
https://t.me/Koko3kote`
        )}
        ${getFileTag('3')}
        ${getDuration('3')}
        ${paintChapters('3')}
      </item>

      <item>
        <itunes:episodeType>full</itunes:episodeType>
        <itunes:episode>4</itunes:episode>
        <title>Она сделала «ПУСК»!</title>
        <itunes:author>Лида Чапко, Никита Новосёлов и Костя Коковихин</itunes:author>
        <itunes:subtitle>Катя Беляева, создатель «Пусков» и программы Digital Art в ДВФУ</itunes:subtitle>
        <itunes:explicit>yes</itunes:explicit>
        <itunes:keywords>Владивосток, фестивали, современное искусство, ДВФУ, МИСиС</itunes:keywords>
        <itunes:image href="https://zakutokmedia.ru/shows/gosuch/4.jpg"/>
        <link>https://zakutokmedia.ru</link>
        <pubDate>Thu, 19 Aug 2021 15:59:27 GMT+1000</pubDate>
        ${getDescription(
          `<strong>Она сделала «ПУСК»!</strong>
<br><br>

В гостях Катя Беляева. Катя Руководитель Центра новых образовательных программ в НИТУ «МИСиС». Основатель первой в России магистратуры Digital Art в ДВФУ и создатель фестиваля «ПУСК» о котором не слышал только Костя. Мы поговорили о современных учебных программах, технологиях, фестивалях «Пуск», чем Катя занимается сейчас.
<br><br>


<strong>Гость выпуска</strong><br>
Катя Беляева, создатель «Пусков» и программы Digital Art в ДВФУ<br>

<strong>Ведущие выпуска</strong><br>
Лида Чапко, Никита Новосёлов, Костя Коковихин<br>

<strong>Инстаграм Кати</strong><br>
https://www.instagram.com/5th_november<br>

<strong>Digital Art в ДВФУ</strong><br>
https://www.instagram.com/da.fefu<br>

<strong>Арттех в МИСИС</strong><br>
https://www.instagram.com/arttech.misis<br>

<strong>Фестивали ПУСК</strong><br>
https://www.instagram.com/pusk.team<br>

<strong>Фестивали ПУСК</strong><br>
https://www.instagram.com/pusk.team<br>

<strong>Фильм «ЭКСПЕДИЦИЯ»</strong><br>
https://www.youtube.com/watch?v=vwvtmzlLU70<br>

<strong>Про Путина (Катя на 26-й минуте)</strong><br>
http://kremlin.ru/events/president/transcripts/56000/videos<br>

<strong>Position #2</strong><br>
https://www.youtube.com/watch?v=LNSrcNj5zgk<br>

<strong>Наш сайт</strong><br>
https://zakutok.media/gosuch<br>

<strong>Наш инстаграм</strong><br>
https://instagram.com/gosuchornotgosuch<br>

<strong>Пишите нам в Телеграм:</strong><br>
https://t.me/Koko3kote`
        )}
        ${getFileTag('4')}
        ${getDuration('4')}
        ${paintChapters('4')}
      </item>

      <item>
        <itunes:episodeType>full</itunes:episodeType>
        <itunes:episode>5</itunes:episode>
        <title>VLADIVOSTOK DESIGN WEEK — не опять, а снова!</title>
        <itunes:author>Лида Чапко, Никита Новосёлов</itunes:author>
        <itunes:subtitle>Юлия и Даниэла, организаторы Vladivostok Design Week</itunes:subtitle>
        <itunes:explicit>yes</itunes:explicit>
        <itunes:keywords>Владивосток, фестивали, современное искусство, Vladivostok Design Week</itunes:keywords>
        <itunes:image href="https://zakutokmedia.ru/shows/gosuch/5.jpg"/>
        <link>https://zakutokmedia.ru</link>
        <pubDate>Sun, 19 Sep 2021 14:19:13 GMT+1000</pubDate>
        ${getDescription(
          `<strong>VLADIVOSTOK DESIGN WEEK — не опять, а снова!</strong>
<br><br>

Говорим с девочками о том, как делается самое знаковое событие года про дизайн во Владивостоке.
<br><br>

<strong>Гости выпуска</strong><br>
Юлия и Даниэла, организаторы Vladivostok Design Week<br>

<strong>Ведущие выпуска</strong><br>
Лида Чапко, Никита Новосёлов<br><br><br>

<strong>Инстаграм VDW</strong><br>
https://www.instagram.com/vladivostokdesignweek/<br>

<strong>Инстаграм Даниэлы</strong><br>
https://www.instagram.com/daniela_pika_design/<br>

<strong>Инстаграм Юли</strong><br>
https://www.instagram.com/yuliameshkova/<br><br><br>

<strong>Наш сайт</strong><br>
https://zakutok.media/gosuch<br>

<strong>Наш инстаграм</strong><br>
https://instagram.com/gosuchornotgosuch<br>

<strong>Пишите нам в Телеграм:</strong><br>
https://t.me/Koko3kote`
        )}
        ${getFileTag('5')}
        ${getDuration('5')}
        ${paintChapters('5')}
      </item>
    </channel>
  </rss>`)


  try {
    writeFileSync("src/routes/gosuch/_cached_RSS", feed)
  } catch (err) {
    console.error(err)
  }

  return feed
};


export function get() {
  return {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
    },
    body: getRssFeed(),
  };
}

export function head() {
  return {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
    },
    body: getRssFeed(),
  };
}