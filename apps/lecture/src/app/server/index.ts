import { app, MetaView, type LayoutData } from '@rune-ts/server';
import type { Page } from 'rune-ts';
import UAParser from 'ua-parser-js';
import favicon from '../../../public/favicon.png';
import { ClientRouter } from '../route';

const server = app();
server.use((req, res, next) => {
  const ua_string = req.headers['user-agent'];
  const parser = new UAParser(ua_string);
  res.locals.is_mobile = !!parser.getDevice().type;

  res.locals.layoutData = {
    html: {
      is_mobile: res.locals.is_mobile,
    },
    head: {
      title: '',
      description: '',
      link_tags: [
        {
          rel: 'icon',
          href: favicon,
          type: 'image/png',
        },
      ],
    },
  } as LayoutData;

  return next();
});

const addRenderHandler = (createPage: (data: object) => Page<object>) => {
  server.get(createPage.toString(), (req, res, next) => {
    res.send(new MetaView(createPage({}), res.locals.layoutData).toHtml());
  });
};

addRenderHandler(ClientRouter['/']);
addRenderHandler(ClientRouter['/part-1/section-2']);
addRenderHandler(ClientRouter['/part-1/section-3']);
addRenderHandler(ClientRouter['/part-1/section-4']);
addRenderHandler(ClientRouter['/part-1/section-5']);
addRenderHandler(ClientRouter['/part-1/section-6']);
addRenderHandler(ClientRouter['/part-1/section-7']);
addRenderHandler(ClientRouter['/part-1/section-8']);
addRenderHandler(ClientRouter['/part-1/section-9']);
addRenderHandler(ClientRouter['/part-1/section-10']);
addRenderHandler(ClientRouter['/part-1/section-11']);