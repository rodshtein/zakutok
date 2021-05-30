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
  let length = getAudioTags(fileName, format).length
  let duration = new Date(Math.ceil(length)).toISOString().substr(11, 8);
  return `<itunes:duration>${duration}</itunes:duration>`
}



function paintChapters(fileName, format = audioFormat){
  let chapter = getAudioTags(fileName, format).chapter

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
    <rss
    version="2.0"
    xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:media="https://search.yahoo.com/mrss/"
    xmlns:dcterms="https://purl.org/dc/terms/"
    xmlns:spotify="https://www.spotify.com/ns/rss"
    xmlns:psc="https://podlove.org/simple-chapters/"
    >
    <channel>
      <title>Gosuch</title>
      <itunes:title>Gosuch</itunes:title>
      <link>https://zakutokmedia.ru</link>
      <atom:link
        href="https://zakutokmedia.ru/gosuch/rss"
        type="application/rss+xml" />
      <description> Подкаст о людях, которые занимаются интересными делами. Мы ничего в этом не понимаем, поэтому вопросами глупыми их пытем. Наш сайт zakutokmedia.ru </description>
      <image>
        <title>Gosuch Подкаст</title>
        <link>https://zakutokmedia.ru</link>
        <url>https://zakutokmedia.ru/covers/gosuch.jpg</url>
      </image>
      <author>Лида, Никита и Костя</author>
      <itunes:author>Лида, Никита и Костя</itunes:author>
      <copyright>СС BY-NC-ND 4.0</copyright>
      <language>ru</language>
      <spotify:countryOfOrigin>ru</spotify:countryOfOrigin>
      <managingEditor>kk@kokovikhin.digital (Костя Коковихин)</managingEditor>
      <webMaster>mz@kokovikhin.digital (Миша Родштейн)</webMaster>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <itunes:explicit>true</itunes:explicit>
      <itunes:type>episodic</itunes:type>
      <itunes:owner>
        <itunes:name>Zakutok Media</itunes:name>
        <itunes:email>kk@kokovikhin.digital</itunes:email>
      </itunes:owner>
      <itunes:image href="https://zakutokmedia.ru/covers/gosuch.jpg" />
      <itunes:category text="Comedy">
      <itunes:category text="Comedy Interviews" />
      </itunes:category>
      <itunes:category text="Business">
        <itunes:category text="Non-Profit" />
        </itunes:category>
      <ttl>60</ttl>
      <item>
        <itunes:episodeType>full</itunes:episodeType>
        <itunes:episode>1</itunes:episode>
        <title>Пилотный выпуск</title>
        ${getFileTag('1')}
        <pubDate>Thu, 27 May 2021 00:00:00 GMT</pubDate>
        <description>
        <![CDATA[
          <p>Поговорили о тканях с Наташей Балахонцевой.</p>
          <p>У Наташи есть «Мечта» — магазин тканей. Наташа пришла к нам и рассказала — с чего начинается мечта, зачем искать ткань в итальянской деревушке, и почему важно встретить своего мастера.
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
        ${paintChapters('1')}
        ${getDuration('1')}
        <itunes:explicit>true</itunes:explicit>
        <itunes:keywords>владивосток, ткани, бизнес, пошив, портной</itunes:keywords>
        <itunes:image href="https://zakutokmedia.ru/shows/gosuch/1.jpg"/>
        <link>https://zakutokmedia.ru</link>
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


