#!/usr/bin/env node

function ytunnus(tunnus) {
	/* 
	(c) Juho Vähäkangas
	MIT Lisenssi
	Jos tunnus syötetään esim; 2453493-9
		return true/false
	Jos tunnus syötetään esim; 2453493
		return 2453493-9
	*/

	tunnus=tunnus.toString();

	function withSum(t) 
	{
		var Numbers = [7, 9, 10, 5, 8, 4, 2];
		var Tunnus = [];
		var Tulos = 0;
		t = t.split("-")[0]
		for (i = 0; i < t.length; i++)
		{
			Tunnus.push(t[i]);
		}
		for (var i=0; i<Tunnus.length; i++) 
		{
			Tulos+=Tunnus[i]*Numbers[i];
		}
		Tulos = (11-(Tulos%11))
		return t+"-"+Tulos;
	}

	function haveSum(t) {
		if (t.match("-") === null)
		{
			return false
		}
		return true
	}
	function compare(ytunnus1, ytunnus2)
	{
		if (haveSum(ytunnus1))
		{
			if (ytunnus1 == ytunnus2) return true;
		}

		return false;	
	}

	if (haveSum(tunnus)) 
	{
		return compare(tunnus, withSum(tunnus));
	}
	else
	{
		return withSum(tunnus);
	}
}
exports.ytunnus = ytunnus;
