import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
  it ('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const item = new Item('foo', 1, 100)
    const gildedRose = new GildedRose([item])
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(99)    
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(97)    
  })
});
