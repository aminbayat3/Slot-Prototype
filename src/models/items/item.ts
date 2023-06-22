export class Item {

    id: string;
    name: string;
    description: string;
    percentage: number;
    value: number;
    src: string;
    constructor(id: string, name: string, description: string, percentage: number, value: number, src: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.percentage = percentage;
      this.value = value;
      this.src = src;
    }
}