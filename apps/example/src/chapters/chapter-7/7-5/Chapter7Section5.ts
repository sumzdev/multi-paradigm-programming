import { ChapterPage } from '../../ChapterPage';
import { main } from './alert';

export class Chapter7Section5 extends ChapterPage {
  override async onRender() {
    await main();
  }
}
