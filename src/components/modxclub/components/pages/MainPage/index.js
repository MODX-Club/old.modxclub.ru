

import React, { Component } from 'react';


import Page from '../layout';


export class MainPage extends Page {

	
	setPageMeta(meta = {}) {

		return super.setPageMeta({
			title: "Главная страница",
		});

	}


}

export default MainPage;
