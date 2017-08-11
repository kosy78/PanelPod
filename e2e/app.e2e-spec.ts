import { PanelpodappPage } from './app.po';

describe('panelpodapp App', () => {
  let page: PanelpodappPage;

  beforeEach(() => {
    page = new PanelpodappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
