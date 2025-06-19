import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, } from "@/components/ui/alert-dialog";
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
}

const MedicationList: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', dosage: '', frequency: '' });
    const [medications, setMedications] = useState<Medication[]>([]);
    const [AlertMsg, setAlertMsg] = useState('');
    const [AlertMsgHeading, setAlertMsgHeading] = useState('');
    const [mode, setMode] = useState<'alert' | 'confirm'>('alert');
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.dosage || !formData.frequency) {
            setAlertMsgHeading('Alert');
            setAlertMsg('All fields are required.');
            setOpen(true);
            return;
        }
        const { data, error } = await supabase
            .from('medications')
            .insert([formData]);

        if (error) {
            console.error('Insert error:', error);
        } else {
            console.log('Inserted successfully:', data);
            setAlertMsgHeading('Success');
            setAlertMsg(`${formData.name} added to Medication list`);
            setOpen(true);
            fetchMedications();
            setFormData({ name: '', dosage: '', frequency: '' });
        }
    }
    const handleDelete = async (id: number) => {
        const { error } = await supabase
            .from('medications')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Delete error:', error.message);
            setAlertMsgHeading('Error');
            setAlertMsg('Failed to delete medication.');
        } else {
            setAlertMsgHeading('Deleted');
            setAlertMsg('Medication deleted successfully.');
            fetchMedications();
        }
        setOpen(true);
    };

    const fetchMedications = async () => {
        const { data, error } = await supabase
            .from('medications')
            .select('*');

        if (error) {
            console.error('Fetch error:', error.message);
        } else {
            setMedications(data);
            console.log('All medications:', data);
        }
    };
    useEffect(() => {
        fetchMedications();
    }, []);
    return (<div>
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{AlertMsgHeading}</AlertDialogTitle>
                    <AlertDialogDescription>{AlertMsg}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => {
                        setOpen(false);
                        setConfirmDeleteId(null);
                    }}>
                        {mode === 'confirm' ? 'Cancel' : 'Close'}
                    </AlertDialogCancel>

                    {mode === 'confirm' && (
                        <Button
                            variant="destructive"
                            onClick={async () => {
                                if (confirmDeleteId !== null) {
                                    const { error } = await supabase
                                        .from('medications')
                                        .delete()
                                        .eq('id', confirmDeleteId);

                                    if (error) {
                                        setAlertMsgHeading('Error');
                                        setAlertMsg('Failed to delete medication.');
                                    } else {
                                        setAlertMsgHeading('Deleted');
                                        setAlertMsg('Medication deleted successfully.');
                                        fetchMedications();
                                    }

                                    setMode('alert');
                                    setConfirmDeleteId(null);
                                }
                                setOpen(true);
                            }}
                        >
                            Delete
                        </Button>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <Card>
            <CardHeader className='flex flex-row justify-between items-center'>
                <CardTitle>
                    Medications List
                </CardTitle>
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
                        {medications.map((med) => (
                            <tr key={med.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{med.name}</td>
                                <td className="px-4 py-2">{med.dosage}mg</td>
                                <td className="px-4 py-2">
                                    {med.frequency}
                                    <button
                                        onClick={() => {
                                            setConfirmDeleteId(med.id);
                                            setMode('confirm');
                                            setAlertMsgHeading('Confirm Deletion');
                                            setAlertMsg(`Are you sure you want to delete "${med.name}"? This action cannot be undone.`);
                                            setOpen(true);
                                        }}
                                        className="ml-4 text-red-500 hover:text-red-700 float-right mt-2"
                                        title="Delete"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </td>
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
                                <Input type='text' onChange={handleChange} value={formData.name} name='name' required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">
                                    Dosage(in Mg):
                                </label>
                                <Input type='number' onChange={handleChange} value={formData.dosage} name='dosage' required />
                            </div>
                            <div className="mb-8">
                                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                                    Frequency
                                </label>
                                <Input type='text' onChange={handleChange} value={formData.frequency} name='frequency' required />
                            </div>
                            <Button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Add Medication
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    </div>);
};

export default MedicationList;
