import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-border/20 p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-foreground">MediCare Companion</h1>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;