async function token(id,token){
    const moment = require('moment-timezone');
    const ShortUniqueId = require('short-unique-id');
    const uid = new ShortUniqueId({ length: 10, dictionary: 'alphanum_lower'});
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({host: '86.48.26.30', user: 'webapis', database: 'webapis', password: 'zJfeXcPzZbHyxXpw'});
    const [rows] = await connection.execute('SELECT a.`id`,a.`account`,(SELECT b.`limit` FROM `accounts` b WHERE b.`id`=a.`account`) AS `limit` FROM `applications` a WHERE a.`id`=? AND a.`token`=?',[id,token]);
    if(rows.length==1){
        const [total] = await connection.execute('SELECT SUM(z.`requests`) AS `total` FROM (SELECT b.`requests` FROM `applications__statistics` b WHERE b.`application` IN (SELECT c.`id` FROM `applications` c WHERE c.`account`=?)) as z',[rows[0].account])
        if(parseInt(total[0].total)<parseInt(rows[0].limit)){
            const [statistics] = await connection.execute('SELECT a.* FROM `applications__statistics` a WHERE a.`application`=? AND a.`date`=?',[id,moment().tz("America/Sao_Paulo").format("YYYY-MM-DD 00:00:00")]);
            if(statistics.length==1){
                await connection.execute('UPDATE `applications__statistics` SET `requests`=requests+1 WHERE `application`=? AND date=?',[id,moment().tz("America/Sao_Paulo").format("YYYY-MM-DD 00:00:00")]);
            }else{
                await connection.execute('INSERT INTO `applications__statistics` (`id`,`application`,`date`,`requests`) VALUES (?,?,?,?)',[uid(),id,moment().tz("America/Sao_Paulo").format("YYYY-MM-DD 00:00:00"),1]);
            }
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

module.exports = { token };