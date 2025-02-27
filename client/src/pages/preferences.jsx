import React from "react";

import TabsComponent from "@/components/tabComponents";

function Preferences() {
	return (
		<div className="p-6 max-w-6xl mx-auto  rounded-lg overflow-hidden mt-2 bg-main min-h-screen">
			<h4 className="border-1 border-b border-gray-400">Genres & Authors</h4>
			<TabsComponent />
		</div>
	);
}

export default Preferences;
