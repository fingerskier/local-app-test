const debug = require('debug')('localapp:ctrl.data')


const self = {
  settings: {
    all: async()=>{
      try {
        const prep = global.DB.prepare('SELECT * FROM settings')
        
        const result = prep.all()
        
        return result
      } catch (error) {
        console.error(error)
      }
    },
    
    
    get: async(key)=>{
      try {
        const prep = global.DB.prepare(`SELECT * FROM settings WHERE key = '${key}'`)
        const result = prep.all()
        
        return result
      } catch (error) {
        console.error(error)
      }
    },
    
    
    set: async(key,val)=>{
      try {
        const prep = global.DB.prepare(`
          INSERT OR REPLACE INTO
          settings(key, value)
          VALUES('${key}', '${val}')
        `)
        const result = prep.run()
        
        return result
      } catch (error) {
        console.error(error)
      }
    }
  }
}


module.exports = self