import { ForemostlaboratoriesPage } from './app.po';

describe('foremostlaboratories App', function() {
  let page: ForemostlaboratoriesPage;

  beforeEach(() => {
    page = new ForemostlaboratoriesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
