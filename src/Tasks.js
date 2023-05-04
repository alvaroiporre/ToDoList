export default class Tasks {
    constructor() {
        this.list = [];
    }

    add = (data) => this.list.push(data);

    remove = (id) => {
        this.list = this.list.filter((value) => value.index !== id);
        this.updateIndex();
    };
    
    update = (index, description) => {
        this.list[index - 1].description = description;
    }

    updateIndex = () => {
        for(let i = 0; i < this.list.length; i += 1) {
            this.list[i].index = i + 1;
        }
    }

    
}