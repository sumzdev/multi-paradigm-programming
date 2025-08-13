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
addRenderHandler(ClientRouter['/1-1']);
addRenderHandler(ClientRouter['/1-2']);
addRenderHandler(ClientRouter['/1-3']);
addRenderHandler(ClientRouter['/1-4']);
addRenderHandler(ClientRouter['/1-5']);
addRenderHandler(ClientRouter['/2-1']);
addRenderHandler(ClientRouter['/2-2']);
addRenderHandler(ClientRouter['/2-3']);
addRenderHandler(ClientRouter['/3-1']);
addRenderHandler(ClientRouter['/3-3']);
addRenderHandler(ClientRouter['/3-4']);
addRenderHandler(ClientRouter['/4-1']);
addRenderHandler(ClientRouter['/4-2']);
addRenderHandler(ClientRouter['/4-3']);
addRenderHandler(ClientRouter['/4-4']);
addRenderHandler(ClientRouter['/5-1']);
addRenderHandler(ClientRouter['/5-2']);
addRenderHandler(ClientRouter['/5-3']);
addRenderHandler(ClientRouter['/5-4']);
addRenderHandler(ClientRouter['/6-1']);
addRenderHandler(ClientRouter['/6-2']);
addRenderHandler(ClientRouter['/7-1']);
addRenderHandler(ClientRouter['/7-234']);
addRenderHandler(ClientRouter['/7-5']);
addRenderHandler(ClientRouter['/7-5-2']);
