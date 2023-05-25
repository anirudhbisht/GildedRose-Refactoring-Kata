import { Item, GildedRose, BrieItem, BackstageItem, SulfurasItem, ConjurItem } from '@/gilded-rose';

describe ('AgedBrie', () => {
  it('increases in Quality the older it gets', () => {
    const brieItem  = new BrieItem(10, 20)
    brieItem.updateQuality()
    expect(brieItem.quality).toBeGreaterThan(20)
    expect(brieItem.sellIn).toBe(9)
  })
})

describe ('Backstage passes', () => {
  it ('increases in Quality as its SellIn value approaches if SellIn more than 10 days', () => {
    const backstageItem = new BackstageItem(12, 30)
    backstageItem.updateQuality()
    expect(backstageItem.quality).toBe(31)
  })
  it ('quality increases by 2 when there are 10 days or less', () => {
    const backstageItem = new BackstageItem(10, 30)
    backstageItem.updateQuality()
    expect(backstageItem.quality).toBe(32)
  })
  it ('quality increases by 3 when there are 5 days or less', () => {
    const backstageItem = new BackstageItem(5, 30)
    backstageItem.updateQuality()
    expect(backstageItem.quality).toBe(33)
  })
  it ('decreases to 0 when sellIn passes', () => {
    const backstageItem = new BackstageItem(0, 30)
    backstageItem.updateQuality()
    expect(backstageItem.quality).toBe(0)
  })
})


describe ('Sulfuras', () => {
  it('never has to be sold or decreases in Quality', () => {
    const sellIn = 50
    const quality = 50
    const sulfurasItem = new SulfurasItem(sellIn, quality)
    sulfurasItem.updateQuality()
    expect(sulfurasItem.quality).toBe(quality)
    expect(sulfurasItem.sellIn).toBe(sellIn)
  })
})


describe ('Conjured', () => {
  it('degrade in Quality twice as fast as normal items', () => {
    const sellIn = 50
    const quality = 50
    const conjuredItem = new ConjurItem(sellIn, quality)
    conjuredItem.updateQuality()
    expect(conjuredItem.quality).toBe(quality - 2)
    expect(conjuredItem.sellIn).toBe(sellIn - 1)
  })
})
