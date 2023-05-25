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

  it('The Quality of an item is never negative', () => {
    let item = new Item('foo', 1, 1)
    const gildedRose = new GildedRose([item])
    gildedRose.updateQuality()
    const items = gildedRose.updateQuality()

    expect(items[0].quality).not.toBeLessThan(0)
  })

  it('"Aged Brie" actually increases in Quality the older it gets', () => {
    const brieItem = new Item('Aged Brie', 50, 30)
    const gildedRose = new GildedRose([brieItem])
    gildedRose.updateQuality()
    expect(gildedRose.items[0].quality).toBeGreaterThan(30)
  })

  it('"Sulfuras, Hand of Ragnaros", being a legendary item, never has to be sold or decreases in Quality', () => {
    const sellIn = 50
    const quality = 50
    const sulfurasItem = new Item('Sulfuras, Hand of Ragnaros', sellIn, quality)
    const gildedRose = new GildedRose([sulfurasItem])
    gildedRose.updateQuality()
    const item = gildedRose.items[0]
    expect(item.quality).toBe(quality)
    expect(item.sellIn).toBe(sellIn)
  })

  it('"Backstage passes" increases in Quality as its SellIn value approaches if SellIn more than 10 days', () => {
    const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 12, 30)
    const gildedRose = new GildedRose([backstageItem])
    const item = gildedRose.updateQuality()[0]
    expect(item.quality).toBeGreaterThan(30)
    expect(item.sellIn).toBe(11)
  })

  it('Backstage passes quality increases by 2 when there are 10 days or less', () => {
    const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 30)
    const gildedRose = new GildedRose([backstageItem])
    const item = gildedRose.updateQuality()[0]
    expect(item.quality).toBe(32)
  })

  it('Backstage passes quality increases by 3 when there are 5 days or less', () => {
    const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 30)
    const gildedRose = new GildedRose([backstageItem])
    const item = gildedRose.updateQuality()[0]
    expect(item.quality).toBe(33)
  })

  it('Backstage passes quality drops to 0 when there are 0 days left', () => {
    const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 30)
    const gildedRose = new GildedRose([backstageItem])
    const item = gildedRose.updateQuality()[0]
    expect(item.quality).toBe(0)
  })

  it('"Conjured" items degrade in Quality twice as fast as normal items')
});
