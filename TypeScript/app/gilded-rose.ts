export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality(): void {
    this.quality -- 
    if (this.sellIn <= 0) {
      this.quality--
    }
    if (this.quality < 0) {
      this.quality = 0
    }
    this.sellIn--
  }
}

export class BrieItem extends Item {
  constructor(sellIn: number, quality:number) {
    super('Aged Brie', sellIn, quality)
  }
  updateQuality(): void {
    this.quality += 1
    this.sellIn -=1
  }
}

export class BackstageItem extends Item {
  constructor(sellIn: number, quality:number) {
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality)
  }
  updateQuality(): void {
    if (this.sellIn > 10) {
      this.quality += 1
    } else if (this.sellIn > 5) {
      this.quality += 2
    } else if (this.sellIn > 3) {
      this.quality += 3
    } else if (this.sellIn <= 0) {
      this.quality = 0
    }
    this.sellIn -=1
  }
}

export class SulfurasItem  extends Item {
  constructor(sellIn: number, quality: number) {
    super('Sulfuras, Hand of Ragnaros', sellIn, quality)
  }
  updateQuality(): void {/** do nothing */}
}

export class ConjurItem  extends Item {
  constructor(sellIn: number, quality: number) {
    super('Conjured', sellIn, quality)
  }
  updateQuality(): void {
    this.quality -= 2
    this.sellIn -= 1
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = [];
    for (const item of items) {

      if (item.name === 'Aged Brie') {
        this.items.push(new BrieItem(item.sellIn, item.quality))
      } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
        this.items.push(new SulfurasItem(item.sellIn, item.quality))
      } else if  (item.name === 'Conjured') {
        this.items.push(new ConjurItem(item.sellIn, item.quality))
      } else if  (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.items.push(new BackstageItem(item.sellIn, item.quality))
      } else {
        this.items.push(item)
      }
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].updateQuality()
    }
    return this.items;
  }
}
