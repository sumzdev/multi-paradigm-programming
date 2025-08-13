import { fx } from '../../../lib/fx4';

// [4-41]
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = function() {
      resolve(image);
    }
    image.onerror = function() {
      reject(new Error(`load error : ${url}`));
    }
  });
}

const urls = [
  "https://s3.marpple.co/files/m2/t3/colored_images/45_1115570_1162087_150x0.png",
  "https://s3.marpple.co/f1/2018/1/1054966_1516076919028_64501_150x0.png",
  "https://s3.marpple.co/f1/2019/1/1235206_1548918825999_78819_150x0.png",
  "https://s3.marpple.co/f1/2019/1/1235206_1548918758054_55883_150x0.png",
];

const urls2 = [
  "https://s3.marpple.co/files/m2/t3/colored_images/45_1115570_1162087_150x0.png",
  "https://s3.marpple.co/f1/2018/1/1054966_1516076919028_64501_150x0.jpg",
  "https://s3.marpple.co/f1/2019/1/1235206_1548918825999_78819_150x0.png",
  "https://s3.marpple.co/f1/2019/1/1235206_1548918758054_55883_150x0.png",
];

async function code_4_42() {
  async function calcTotalHeight(urls: string[]) {
    try {
      const totalHeight = await urls
        .map(async (url) => {
          const img = await loadImage(url);
          return img.height;
        })
        .reduce(
          async (a, b) => await a + await b,
          Promise.resolve(0)
        );
      return totalHeight;
    } catch (e) {
      console.error('error: ', e);
    }
  }

  console.log(await calcTotalHeight(urls));
  // 585
  console.log(await calcTotalHeight(urls2)); // Error: load error..
  // undefined
}

async function code_4_43() {
  async function calcTotalHeight2(urls: string[]) {
    try {
      const totalHeight = await fx(urls)
        .toAsync()
        .map(loadImage)
        .map(img => img.height)
        .reduce((a, b) => a + b, 0);
      return totalHeight;
    } catch (e) {
      console.error('error: ', e);
    }
  }

  console.log(await calcTotalHeight2(urls));
  // 585
  console.log(await calcTotalHeight2(urls2)); // Error: load error..
  // undefined
}

async function code_4_44_45() {
  const getTotalHeight = (urls: string[]) =>
    fx(urls)
      .toAsync()
      .map(loadImage)
      .map(img => img.height)
      .reduce((a, b) => a + b, 0);

  try {
    const height = await getTotalHeight(urls);
    // ...
  } catch (e) {
    console.error(e);
  }

  // or
  async function myFunction(urls: string[]) {
    try {
      return await getTotalHeight(urls);
    } catch {
      return 0;
    }
  }

  console.log(await myFunction(urls));
  console.log(await myFunction(urls2));
}

export async function main() {
  await code_4_42();
  await code_4_43();
  await code_4_44_45();
}
