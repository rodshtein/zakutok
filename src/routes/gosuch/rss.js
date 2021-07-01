import { readFileSync, writeFileSync, statSync } from 'fs';
import * as ID3Reader from 'node-id3';
import * as prettydata from 'pretty-data';

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
      <description>
Подкаст о людях, которые занимаются интересными делами.
Мы ничего в этом не понимаем, поэтому вопросами глупыми их пытаем.

Ведущие шоу:
Лида Чапко, Никита Новосёлов, Костя Коковихин

Наш сайт:
https://zakutokmedia.ru/gosuch

Наш инстаграм:
https://instagram.com/gosuchornotgosuch

Пишите нам в Телеграм:
https://t.me/Koko3kote
      </description>
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
        <description>
Поговорили о тканях с Наташей Балахонцевой.

У Наташи есть «Мечта» — магазин тканей. Наташа пришла к нам и рассказала — с чего начинается мечта, зачем искать ткань в итальянской деревушке, и почему важно встретить своего мастера.

Гость выпуска:
Наташа Балахонцева

Ведущие выпуска:
Лида Чапко, Никита Новосёлов, Костя Коковихин

Инстаграм «Мечты»:
https://instagram.com/mechta_tkani

Наш сайт:
https://zakutokmedia.ru/gosuch

Наш инстаграм:
https://instagram.com/gosuchornotgosuch

Пишите нам в Телеграм:
https://t.me/Koko3kote
        </description>
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
        <description>
Поговорили о книгах и издательстве с Дианой Лютер.

Диана Лютер, издатель, детский автор и совладелица магазинов «Игра слов», «Лютература».

«Игра слов» ставит для себя цель предложить не только популярную литературу, но и открыть для читателей книги порядка полусотни независимых издательств, а также десятки периодических изданий, которые практически не добираются до местного читателя, так как редко попадают на полки книжных супермаркетов.

Гость выпуска:
Диана Лютер

Ведущие выпуска:
Лида Чапко, Никита Новосёлов, Костя Коковихин

Инстаграм Дианы:
https://instagram.com/lyuter

Инстаграм Игры слов:
https://instagram.com/igraslov.bookstore

Инстаграм Лютературы:
https://instagram.com/lyuteratura

Наш сайт:
https://zakutokmedia.ru/gosuch

Наш инстаграм:
https://instagram.com/gosuchornotgosuch

Пишите нам в Телеграм:
https://t.me/Koko3kote
        </description>
        ${getFileTag('2')}
        ${getDuration('2')}
        ${paintChapters('2')}
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