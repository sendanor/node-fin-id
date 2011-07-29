/*

	*** Tarkisteiden laskemisia ***

	luonut:	Mux F-Production | http://mux.fi/ | 2009

	käyttöoikeus: Sendanor - http://sendanor.fi/

	Käyttöoikeus sisältää vapaan muokkauksen ja soveltamisen
	sekä käyttötarkoituksen (kaupallisuus, avoin lähdekoodi,...).



	created: Su 2009-05-17
	updated: Su 2009-05-17
	$Id: hetu.js 8373 2009-06-30 08:38:04Z jheusala $
	-----


	FUNKTIOT:

	TarkistaHETU	Tarkista henkilötunnuksen oikeellisuus.


	SUUNNITELMISSA:

	- pankkitilin oikeellisuuden laskenta (kotimaisen ja IBAN)

*/

/** Parse hetu string to an object */
function parse_hetu_string (hetu) {
	// Tarkista henkilötunnus hetu (merkkijono muotoa PPKKVVXNNNT).
	// dd = 01..31 (päivä)
	// mm = 01..12 (kuukausi)
	// yy = 00..99 (vuosi)
	// x = "+" tarkoittaa 1800-lukua, "-" 1900-lukua ja "A" 2000-lukua
	// n = 3-numeroinen yksilönumero (miehillä pariton, naisilla parillinen)
	// t = tarkistemerkki (jokin seuraavista: 0123456789ABCDEFHJKLMNPRSTUVWXY)
	
	// Hox: Tähän voisi kehittää paluuvirhekoodeja jos niitä tarvisi.
	
	var that = {};
	
	// vaaditaan 11 merkin pituus
	if (hetu.length!=11) return that;
	
	// tarkista vuosisataa ilmaiseva merkki
	var c = hetu[6].toUpperCase();
	if ((c!=='+') && (c!=='-') && (c!=='A')) return;
	that.x = c;
	
	// lue päivä, kuukausi, vuosi ja yksilönumero
	var pp = parseInt(hetu.substr(0,2), 10);
	if ((pp<1) || (pp>31)) return;
	that.dd = pp;
	
	var kk = parseInt(hetu.substr(2,2), 10);
	if ((kk<1) || (kk>12)) return;
	that.mm = kk;
	
	var vv = parseInt(hetu.substr(4,2), 10);
	if (isNaN(vv) || (vv<0)) return;
	that.yy = vv;
	
	var n = parseInt(hetu.substr(7,3), 10);
	if (isNaN(n) || (n<0)) return;
	that.n = n;
	
	that.t = hetu[10].toUpperCase();
	return that;
}

/** Calculate check sum for finnish hetu ID object */
function hetu_checksum(id) {
	// luodaan iso luku äsken luetuista numeroista ja samalla lasketaan tarkiste
	var n = (id.n + id.yy*1000 + id.mm*100000 + id.dd*10000000)%31;
	var s = '0123456789ABCDEFHJKLMNPRSTUVWXY';
	return s[n];
}

/** Check hetu from a string */
function check_parsed_hetu (id) {
	if(id === undefined) return false;
	if(id.t === undefined) return false;
	return hetu_checksum(id) === id.t;
}

/** Parse date from hetu object */
function parse_hetu_date(id) {
	switch(id.x) {
	case '+': return new Date(1800+id.yy, id.mm-1, id.dd, 12);
	case '-': return new Date(1900+id.yy, id.mm-1, id.dd, 12);
	case 'A': return new Date(2000+id.yy, id.mm-1, id.dd, 12);
	}
}

/** Create hetu object and return it */
function create_hetu (hetu) {
	var hetu = hetu;
	var parsed_hetu = parse_hetu_string(hetu);
	var that = {};
	that.change = function(h) { hetu=h; parsed_hetu = parse_hetu_string(h); };
	that.check = function() { return check_parsed_hetu(parsed_hetu); };
	that.date = function() { return parse_hetu_date(parsed_hetu); };
	that.sex = function() {
		var n = parsed_hetu.n;
		if(n === undefined) return;
		if(typeof n !== "number") return;
		switch(n&1) {
		case 0: return "female";
		case 1: return "male";
		}
	};
	return that;
}

/** Check hetu from a string */
function check_hetu_string (hetu) {
	return create_hetu(hetu).check();
}

/* EOF */
