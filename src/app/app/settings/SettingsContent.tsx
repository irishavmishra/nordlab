'use client';

import { Building2, User, Mail, Shield, Key, Calendar } from 'lucide-react';

interface UserSettings {
  name: string;
  email: string;
  role: string;
}

interface OrganizationSettings {
  name: string;
  type: 'distributor' | 'dealer';
  createdAt: Date;
}

interface SettingsContentProps {
  userSettings: UserSettings;
  organizationSettings: OrganizationSettings | null;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

function capitalizeRole(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export function SettingsContent({
  userSettings,
  organizationSettings,
}: SettingsContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card-dark rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-md bg-graphite border border-slate-dark">
            <Building2 className="w-5 h-5 text-copper" />
          </div>
          <h2 className="text-lg font-medium text-cream">Organization Settings</h2>
        </div>

        {organizationSettings ? (
          <div className="space-y-4">
            <div className="p-4 bg-charcoal rounded-lg border border-slate-dark">
              <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">
                Organization Name
              </p>
              <p className="text-cream">{organizationSettings.name}</p>
            </div>

            <div className="p-4 bg-charcoal rounded-lg border border-slate-dark">
              <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">
                Organization Type
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${
                    organizationSettings.type === 'distributor'
                      ? 'bg-copper/20 text-copper'
                      : 'bg-slate-dark text-warm-gray'
                  }`}
                >
                  {organizationSettings.type === 'distributor'
                    ? 'Distributor'
                    : 'Dealer'}
                </span>
              </div>
            </div>

            <div className="p-4 bg-charcoal rounded-lg border border-slate-dark">
              <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">
                Created
              </p>
              <div className="flex items-center gap-2 text-cream">
                <Calendar className="w-4 h-4 text-warm-gray" />
                {formatDate(organizationSettings.createdAt)}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-warm-gray">No organization found.</p>
        )}
      </div>

      <div className="card-dark rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-md bg-graphite border border-slate-dark">
            <User className="w-5 h-5 text-copper" />
          </div>
          <h2 className="text-lg font-medium text-cream">Account Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-charcoal rounded-lg border border-slate-dark">
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">Name</p>
            <div className="flex items-center gap-2 text-cream">
              <User className="w-4 h-4 text-warm-gray" />
              {userSettings.name}
            </div>
          </div>

          <div className="p-4 bg-charcoal rounded-lg border border-slate-dark">
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">Email</p>
            <div className="flex items-center gap-2 text-cream">
              <Mail className="w-4 h-4 text-warm-gray" />
              {userSettings.email}
            </div>
          </div>

          <div className="p-4 bg-charcoal rounded-lg border border-slate-dark">
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">Role</p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-warm-gray" />
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded ${
                  userSettings.role === 'admin'
                    ? 'bg-copper/20 text-copper'
                    : 'bg-slate-dark text-warm-gray'
                }`}
              >
                {capitalizeRole(userSettings.role)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-charcoal rounded-lg border border-slate-dark">
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">
              Password
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-warm-gray">
                <Key className="w-4 h-4" />
                ••••••••
              </div>
              <a
                href="/app/settings/password"
                className="text-sm text-copper hover:text-copper-light transition-colors"
              >
                Change password
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
