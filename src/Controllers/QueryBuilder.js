class QueryBuilder{
    static processFilter(filters, searchFields){
        let search = {};
        let word = filters.search, wordNum = parseInt(filters.search);
        search = {
            where: {
                or: []
            }
        };
        searchFields.strings.forEach((element, index) => search.where.or.push({[element]: {contains: word}}) );
        if(Number.isInteger(wordNum))
        searchFields.numbers.forEach((element, index) => search.where.or.push({[element]: {contains: wordNum}}) );
        

        if(filters.sort == "") filters.sort = "id";
        if(filters.sortType == "") filters.sortType = "ASC";
        
        let sort = {};
        sort[filters.sort] = filters.sortType;
        search.sort = [];
        search.sort.push(sort);

        return search;
    }

    static async findIn(Model, filters, searchCondition = {}, populate = []){        
        let items = await Model.find(searchCondition)
                              .paginate({page: filters.page-1, limit: filters.number})
                              .populate(populate);
        let numbers = await Model.find(searchCondition);
        let info = {
            current_page: filters.page, 
            last_page: Math.ceil(numbers.length/filters.number), 
            from: (filters.page-1)*filters.number + 1
        }
        return {items: items, pageInfo: info};
    }
}

export {QueryBuilder};