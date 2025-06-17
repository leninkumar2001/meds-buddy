import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
}

const sampleMedications: Medication[] = [
    { id: 1, name: 'Aspirin', dosage: '100mg', frequency: 'Once a day' },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice a day' },
    { id: 3, name: 'Lisinopril', dosage: '10mg', frequency: 'Once a day' },
];

const MedicationList: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', dosage: '', frequency: '' });
        const [error, setError] = useState<string | null>(null);
        const [loading, setLoading] = useState(false);
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            console.log('adsa', formData);
        }
    return (<div>
        <Card>
            <CardHeader className='flex flex-row justify-between items-center px-6 py-3'>
                <CardTitle>
                    Medications List
                </CardTitle>
                <Button className="bg-green-600 hover:bg-green-700 mt-0">
                    Add Medications
                </Button>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-10 justify-between space-y-6">
                <table className="min-w-[55%] border border-black rounded-lg border-collapse my-3 overflow-hidden shadow-lg">
                    <thead >
                        <tr className="bg-gray-100">
                            <th className=" px-4 py-2 text-left">Name</th>
                            <th className=" px-4 py-2 text-left">Dosage</th>
                            <th className="px-4 py-2 text-left">Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleMedications.map((med) => (
                            <tr key={med.id} className="hover:bg-gray-50">
                                <td className=" px-4 py-2">{med.name}</td>
                                <td className=" px-4 py-2">{med.dosage}</td>
                                <td className=" px-4 py-2">{med.frequency}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Card className="min-w-[40%] my-3" style={{ margin: '14px 0' }}>
                    <CardHeader className='min-w-full flex justify-between items-center'>
                        <CardTitle>
                            Add Medications
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name:
                                </label>
                                <Input type='text' onChange={handleChange} value={formData.name} name='name'/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">
                                    Dosage(in Mg):
                                </label>
                                <Input type='number' onChange={handleChange} value={formData.dosage} name='dosage'/>
                            </div>
                            <div className="mb-8">
                                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                                    Frequency
                                </label>
                                <Input type='text' onChange={handleChange} value={formData.frequency} name='frequency'/>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add Medication
                            </button>
                        </form>
                    </CardContent>
                </Card>
                {/* Critical Alerts */}
            </CardContent>
        </Card>
    </div>);
};

export default MedicationList;
