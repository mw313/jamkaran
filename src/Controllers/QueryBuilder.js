class QueryBuilder{
    static proccessFilter(filters, searchFields){
        let search = {};
        let word = filters.search, wordNum = parseInt(filters.search);
        search = {
            where: {
                or: []
            }
        };
        searchFields.strings.forEach(element => search.where.or[element] = {contains: word} );
        if(Number.isInteger(wordNum))
        searchFields.numbers.forEach(element => search.where.or[element] = {contains: wordNum} );
        

        if(filters.sort == "") filters.sort = "id";
        if(filters.sortType == "") filters.sortType = "ASC";
        
        let sort = {};
        sort[filters.sort] = filters.sortType;
        search.sort = [];
        search.sort.push(sort);

        return search;
    }
}